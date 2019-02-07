package main

import (
	"crypto/sha1"
	"flag"
	"fmt"
	"os"
	"os/exec"
)

type SpeakCommand struct {
	language *string
	text     *string
}

func (cmd *SpeakCommand) Flags(fs *flag.FlagSet) *flag.FlagSet {
	cmd.text = fs.String("text", "", "text to speak")
	cmd.language = fs.String("language", "de-DE", "language")
	return fs
}

func (cmd *SpeakCommand) Run(args []string) {
	hash := sha1.New()
	hash.Write([]byte(*cmd.text + *cmd.language))

	tmpFile := fmt.Sprintf(
		"%s/%x.wav",
		TmpDir,
		hash.Sum(nil),
	)

	if _, err := os.Stat(tmpFile); err != nil {
		fmt.Println("Generate new file...")
		err := exec.Command(
			"pico2wave",
			"--lang",
			*cmd.language,
			"--wave",
			tmpFile,
			*cmd.text,
		).Run()

		checkError(err, "pico2wave failed")
	}

	err := exec.Command("play", tmpFile).Run()
	checkError(err, "play failed")
}
