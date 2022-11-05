import sys

print (sys.argv[1:])

name = sys.argv[1]
path = 'src/'+ sys.argv[2] + '/'


fo = open(path + name + '.tsx', "w")
fo.write('''import React, { useEffect, useState } from "react";
import { Background, CenterDiv } from "../components/Pages";

export default function %s() {
  useEffect(() => {
    console.log("%s");
  });
  return (
    <Background>
      <CenterDiv>hihiIam%s</CenterDiv>
    </Background>
  );
}
'''%(name, name, name))


fo.close()


