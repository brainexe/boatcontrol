package main

import (
	"github.com/pkg/errors"
	"gopkg.in/yaml.v2"
	"io/ioutil"
)

type Config struct {
	Debug bool `yaml:"debug"`
}

func loadConfig(filename string) (Config, error) {
	cfg := Config{}

	content, err := ioutil.ReadFile(filename)
	if err != nil {
		return cfg, errors.Errorf("failed to load config file from %s: %s", filename, err)
	}

	if err := yaml.UnmarshalStrict(content, &cfg); err != nil {
		return cfg, errors.Errorf("failed to parse configuration file: %s", err)
	}

	return cfg, nil
}
