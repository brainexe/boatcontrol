class dev {

  include nodejs

  $packages = [
    "curl", "make", "g++", "wget", "vim", "build-essential", "espeak", "whois", "lolcat",

    "git", "git-svn"
    "dstat", "htop", "iotop", "strace", "screen"
  ]

  package { $packages: ensure => "installed" }

}
