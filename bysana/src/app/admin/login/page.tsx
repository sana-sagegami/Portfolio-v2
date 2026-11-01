"use client";

import { useActionState } from "react";
import { login } from "../actions";
import styles from "../admin.module.scss";

export default function LoginPage() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <main className={styles.main}>
      <form action={action} className={styles.loginCard}>
        <h1 className={styles.title}>Admin</h1>
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          required
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" disabled={pending} className={styles.primaryBtn}>
          {pending ? "..." : "Login"}
        </button>
      </form>
    </main>
  );
}
