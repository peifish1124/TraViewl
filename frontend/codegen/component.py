import sys

print (sys.argv[1:])

name = sys.argv[1]
path = 'src/'+ sys.argv[2] + '/'


fo = open(path + name + '.tsx', "w")
fo.write('''import React, { useEffect, useState } from "react";
interface %sProps {
  item?: any;
}

export default function %s(props?: %sProps) {
    useEffect(()=>{
        console.log('%s');
    });
  return (
    <div>%s</div>
  );
}\n'''%(name, name, name, name, name))


fo.close()


