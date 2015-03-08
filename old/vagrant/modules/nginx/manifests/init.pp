class nginx {
  package {"nginx-full":
    ensure => present
  }

  service {"nginx":
    ensure => running,
    require => Package["nginx-full"]
  }

}