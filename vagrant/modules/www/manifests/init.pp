class www {
  file { "/www":
    ensure => "directory",
    mode   => 777,
  }

}
