import React, { useEffect, useState } from "react";

interface TagProps {
  title?: string;
  style?: React.CSSProperties | undefined;
}

export default function Tag(props?: TagProps) {
  return (
    <div
      style={{
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#D1D1D1",
        borderRadius: 5,
        ...props?.style,
      }}
    >
      {props?.title}
    </div>
  );
}
