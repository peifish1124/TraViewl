import sys

print (sys.argv[1:])

name = sys.argv[1]
path = 'src/'+ sys.argv[2] + '/'


fo = open(path + name + '.tsx', "w")
fo.write('''import { Toolbar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Background, CenterDiv } from "../components/Pages";
import TitleBar from "../components/TitleBar";

export default function %s() {
  useEffect(() => {}, []);
  return (
    <>
      <Toolbar></Toolbar>
      <TitleBar title="%s"></TitleBar>
      <Background>
        <CenterDiv>
          <h1>%s</h1>
        </CenterDiv>
      </Background>
    </>
  );
}

'''%(name, name, name))


fo.close()


