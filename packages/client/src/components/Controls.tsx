import type { Component } from "solid-js";
import styles from "./Controls.module.css";

export const Controls: Component = () => {
  return (
    <div class={styles.controls}>
      <button>⬅</button>
      <button>➡</button>
    </div>
  );
}