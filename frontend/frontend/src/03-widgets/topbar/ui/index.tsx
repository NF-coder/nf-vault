import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Register } from "@/04-features/register-popup";
import { Login } from "@/04-features/login-popup";
import { validate } from "@/06-shared/api/auth/validate";
import { logout as logoutReq } from "@/06-shared/api/auth/logout";
import { useError } from "@/05-entities/error";

export const Topbar = () => {
  const [showLoginPopup, isLoginPopupShown] = useState<boolean>(false);
  const [showRegisterPopup, isRegisterPopupShown] = useState<boolean>(false);
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const { showError } = useError();

  const check = async () => {
    try {
      await validate({});
      setIsAuthed(true)
    } catch (e) {
      setIsAuthed(false)
    }
  }
  
  useEffect(() => {
    check() 
  }, [])

  const logout = async () => {
    try {
      logoutReq({});
      setIsAuthed(true)
    } catch (e) {
      showError("Logout error")
    }
  }

  return (
    <div className={styles.topbarWrapper}>
      <p className={styles.logoText}>NFVault</p>
      <div className={styles.navSection}>
        {
          isAuthed ? (
            <p className={styles.navOption} onClick={() => logout()}>[logout]</p>
          ) : (
            <>
              <p className={styles.navOption} onClick={() => isLoginPopupShown(true)}>[login]</p>
              <p className={styles.navOption} onClick={() => isRegisterPopupShown(true)}>[register]</p>
            </>
          )
        }
        
      </div>

      <Register
        isOpen={showRegisterPopup}
        onClose={() => {isRegisterPopupShown(false)}}
        onSuccess={() => {isRegisterPopupShown(false); setIsAuthed(true)}}
      />
      <Login
        isOpen={showLoginPopup}
        onClose={() => {isLoginPopupShown(false)}}
        onSuccess={() => {isLoginPopupShown(false); setIsAuthed(true)}}
      />
    </div>
  );
}