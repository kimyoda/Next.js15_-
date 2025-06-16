"use client";

import { ReactNode, useEffect, useRef } from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

/**
 * Modal 컴포넌트
 * @param children - 모달 내부에 표시될 컨텐츠
 *
 * 주요 기능:
 * 1. createPortal을 사용하여 모달을 DOM의 다른 위치(modal-root)에 렌더링
 * 2. useRouter를 통한 라우팅 처리 (뒤로가기 기능)
 * 3. dialog 엘리먼트를 사용한 네이티브 모달 구현
 */
export default function Modal({ children }: { children: ReactNode }) {
  // dialog 엘리먼트에 대한 참조 생성
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Next.js의 라우터 훅 사용
  const router = useRouter();

  // 컴포넌트 마운트 시 모달 표시
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  // createPortal을 사용하여 모달을 modal-root에 렌더링
  // 이는 모달이 DOM의 다른 위치에 렌더링되도록 하여 z-index나 스타일링 문제를 방지
  return createPortal(
    <dialog
      // 모달이 닫힐 때 라우터를 통해 이전 페이지로 이동
      onClose={() => router.back()}
      onClick={(e) => {
        // 모달의 배경이 클릭되었을 때만 뒤로가기 실행
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
