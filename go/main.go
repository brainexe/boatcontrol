package main

import (
	"fmt"
	"github.com/rakyll/command"
	"os"
)

const (
	TmpDir = "/tmp/boat/"
)

func main()  {
	os.Mkdir(TmpDir, 0766)

	command.On("speak", "prints the version", &SpeakCommand{}, []string{"text"})
	command.Parse()
	command.Run()

	fmt.Printf("s")
}

func checkError(err error, message string)  {
	if err != nil {
		panic(fmt.Sprintf("%s: %s", err.Error(), message))
	}
}