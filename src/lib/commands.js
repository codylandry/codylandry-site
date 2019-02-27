import { Auth } from 'aws-amplify'

async function prompt (term, promptText) {
  term.write(`\n${promptText}: `)
  return await new Promise(resolve => {
    term.newStdout()
    term.scroll()
    term.returnHandler = () => {
      resolve(term.stdout().innerHTML)
    }
  })
}

function writeError (term, message) {
  term.write(`
    <pre style="color: red; white-space: pre-wrap;">
      ${message}
    </pre>
  `)
}

export const commands = {
  cat (argv, cb) {
    var filenames = this._terminal.parseArgs(argv).filenames
    var stdout

    this._terminal.scroll()
    if (!filenames.length) {
      this._terminal.returnHandler = function () {
        stdout = this.stdout()
        if (!stdout)
          return
        stdout.innerHTML += '<br>' + stdout.innerHTML + '<br>'
        this.scroll()
        this.newStdout()
      }.bind(this._terminal)
      return
    }
    filenames.forEach(function (filename, i) {
      var entry = this._terminal.getEntry(filename)

      if (!entry)
        this._terminal.write('cat: ' + filename + ': No such file or directory')
      else if (entry.type === 'dir')
        this._terminal.write('cat: ' + filename + ': Is a directory.')
      else
        this._terminal.write(entry.contents)
      if (i !== filenames.length - 1)
        this._terminal.write('<br>')
    }, this)
    cb()
  },

  cd (argv, cb) {
    var filename = this._terminal.parseArgs(argv).filenames[0],
      entry

    if (!filename)
      filename = '~'
    entry = this._terminal.getEntry(filename)
    if (!entry)
      this._terminal.write('bash: cd: ' + filename + ': No such file or directory')
    else if (entry.type !== 'dir')
      this._terminal.write('bash: cd: ' + filename + ': Not a directory.')
    else
      this._terminal.cwd = entry
    cb()
  },

  ls (argv, cb) {
    var result = this._terminal.parseArgs(argv),
      args = result.args,
      filename = result.filenames[0],
      entry = filename ? this._terminal.getEntry(filename) : this._terminal.cwd,
      maxLen = 0,
      writeEntry

    writeEntry = function (e, str) {
      this.writeLink(e, str)
      if (args.indexOf('l') > -1) {
        if ('description' in e)
          this.write(' - ' + e.description)
        this.write('<br>')
      } else {
        // Make all entries the same width like real ls. End with a normal
        // space so the line breaks only after entries.
        this.write(Array(maxLen - e.name.length + 2).join('&nbsp') + ' ')
      }
    }.bind(this._terminal)

    if (!entry)
      this._terminal.write('ls: cannot access ' + filename + ': No such file or directory')
    else if (entry.type === 'dir') {
      var dirStr = this._terminal.dirString(entry)
      maxLen = entry.contents.reduce(function (prev, cur) {
        return Math.max(prev, cur.name.length)
      }, 0)

      for (var i in entry.contents) {
        var e = entry.contents[i]
        if (args.indexOf('a') > -1 || e.name[0] !== '.')
          writeEntry(e, dirStr + '/' + e.name)
      }
    } else {
      maxLen = entry.name.length
      writeEntry(entry, filename)
    }
    cb()
  },

  gimp (argv, cb) {
    var filename = this._terminal.parseArgs(argv).filenames[0],
      entry,
      imgs

    if (!filename) {
      this._terminal.write('gimp: please specify an image file.')
      cb()
      return
    }

    entry = this._terminal.getEntry(filename)
    if (!entry || entry.type !== 'img') {
      this._terminal.write('gimp: file ' + filename + ' is not an image file.')
    } else {
      this._terminal.write('<img src="' + entry.contents + '"/>')
      imgs = this._terminal.div.getElementsByTagName('img')
      imgs[imgs.length - 1].onload = function () {
        this.scroll()
      }.bind(this._terminal)
      if ('caption' in entry)
        this._terminal.write('<br/>' + entry.caption)
    }
    cb()
  },

  clear (argv, cb) {
    this._terminal.div.innerHTML = ''
    cb()
  },

  sudo (argv, cb) {
    var count = 0
    this._terminal.returnHandler = function () {
      if (++count < 3) {
        this.write('<br/>Sorry, try again.<br/>')
        this.write('[sudo] password for ' + this.config.username + ': ')
        this.scroll()
      } else {
        this.write('<br/>sudo: 3 incorrect password attempts')
        cb()
      }
    }.bind(this._terminal)
    this._terminal.write('[sudo] password for ' + this._terminal.config.username + ': ')
    this._terminal.scroll()
  },

  async login (argv, cb) {
    const term = this._terminal
    const username = await prompt(term, 'Username')
    const password = await prompt(term, 'Password')

    try {
      await Auth.signIn({username, password})
      term.write('\nSuccess!')
    } catch (err) {
      if (err.code === 'UserNotConfirmedException') {
        term.write('\nEmail not confirmed. Resending verification email...')
        await Auth.resendSignUp(username)
        const code = await prompt(term, 'Enter Verification Code')
        await Auth.confirmSignUp(username, code)
        term.write(`\nConfirmed!`)
        return cb()
      }
      writeError(term, err.message)
    }
    cb()
  },

  async passwd (argv, cb) {
    const term = this._terminal
    try {
      const user = await Auth.currentAuthenticatedUser()
      const oldPassword = await prompt(term, 'Old Password')
      const newPassword = await prompt(term, 'New Password')
      await Auth.changePassword(user, oldPassword, newPassword)
    } catch (err) {
      term.write(`\n${err}`)
    }
    cb()
  },

  async logout (argv, cb) {
    const term = this._terminal
    try {
      await Auth.signOut()
      await new Promise(res => setTimeout(res, 1000))
      term.write('\nLogged out')
    } catch (err) {
      term.write(`\n${err.message}`)
    }
    cb()
  },

  async useradd (argv, cb) {
    const term = this._terminal

    const email = await prompt(term, 'Email Address')
    const username = await prompt(term, 'Username')
    let password1 = await prompt(term, 'Password')
    let password2 = await prompt(term, 'Repeat Password')

    while (password1 !== password2) {
      term.write('\nPasswords do not match.  Try Again.')
      password1 = await prompt(term, 'Password')
      password2 = await prompt(term, 'Repeat Password')
    }

    try {
      await Auth.signUp({ username, password: password1, attributes: { email } })
      term.write(`\nsuccess`)
    } catch (err) {
      writeError(term,`\n${err.message}`)
      cb()
      return
    }

    try {
      const code = await prompt(term,'Enter Confirmation Code')
      await Auth.confirmSignUp(username, code)
    } catch (err) {
      writeError(term,`\n${err.message}`)
    }
    cb()
  },

  tree (argv, cb) {
    var term = this._terminal,
      home

    function writeTree (dir, level) {
      dir.contents.forEach(function (entry) {
        var str = ''

        if (entry.name.startsWith('.'))
          return
        for (var i = 0; i < level; i++)
          str += '|  '
        str += '|&mdash;&mdash;'
        term.write(str)
        term.writeLink(entry, term.dirString(dir) + '/' + entry.name)
        term.write('<br>')
        if (entry.type === 'dir')
          writeTree(entry, level + 1)
      })
    }

    home = this._terminal.getEntry('~')
    this._terminal.writeLink(home, '~')
    this._terminal.write('<br>')
    writeTree(home, 0)
    cb()
  },

  help (argv, cb) {
    this._terminal.write(
      'You can navigate either by clicking on anything that ' +
      '<a href="javascript:void(0)">underlines</a> when you put your mouse ' +
      'over it, or by typing commands in the terminal. Type the name of a ' +
      '<span class="exec">link</span> to view it. Use "cd" to change into a ' +
      '<span class="dir">directory</span>, or use "ls" to list the contents ' +
      'of that directory. The contents of a <span class="text">file</span> ' +
      'can be viewed using "cat". <span class="img">Images</span> are ' +
      'displayed using "gimp".<br><br>If there is a command you want to get ' +
      'out of, press Ctrl+C or Ctrl+D.<br><br>')
    this._terminal.write('Commands are:<br>')
    for (var c in Object.keys(this._terminal.commands)) {
      if (this._terminal.commands.hasOwnProperty(c) && !c.startsWith('_'))
        this._terminal.write(c + '  ')
    }
    cb()
  }
}
