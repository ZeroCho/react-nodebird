import React from "react";
import Link from "next/link";

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        <Link href="/">
          <a>노드버드</a>
        </Link>
        <Link href="/profile">
          <a>프로필</a>
        </Link>

        <Link href="/signup">
          <a>회원가입</a>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default AppLayout;
