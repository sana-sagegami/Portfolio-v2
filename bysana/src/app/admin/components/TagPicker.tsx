"use client";

import { useState } from "react";
import styles from "../admin.module.scss";

export default function TagPicker({
  options,
  initial,
}: {
  options: string[];
  initial: string[];
}) {
  const [all, setAll] = useState<string[]>(() => [
    ...options,
    ...initial.filter((t) => !options.includes(t)),
  ]);
  const [selected, setSelected] = useState<string[]>(initial);
  const [draft, setDraft] = useState("");

  const toggle = (t: string) =>
    setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const add = () => {
    const t = draft.replace(/[,、]/g, "").trim();
    if (!t) return;
    if (!all.includes(t)) setAll((a) => [...a, t]);
    setSelected((s) => (s.includes(t) ? s : [...s, t]));
    setDraft("");
  };

  return (
    <div className={styles.label}>
      タグ (クリックで選択 / 下で追加)
      <input type="hidden" name="tags" value={selected.join(",")} />
      <div className={styles.tagChips}>
        {all.map((t) => (
          <button
            type="button"
            key={t}
            onClick={() => toggle(t)}
            className={selected.includes(t) ? styles.chipOn : styles.chip}
            aria-pressed={selected.includes(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className={styles.row}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              e.preventDefault(); // 保存の誤送信を防ぐ
              add();
            }
          }}
          placeholder="新しいタグ"
          className={styles.input}
          style={{ flex: 1 }}
        />
        <button type="button" onClick={add} className={styles.ghostBtn}>
          追加
        </button>
      </div>
    </div>
  );
}
