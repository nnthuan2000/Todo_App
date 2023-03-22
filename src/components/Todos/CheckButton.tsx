import styles from './CheckButton.module.scss';

interface CheckButtonProps {
  isCompleted: boolean;
  onCheck: () => void;
}

function CheckButton({ isCompleted, onCheck }: CheckButtonProps) {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        name=""
        id="checkbox"
        defaultChecked={isCompleted}
        onChange={onCheck}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
}

export default CheckButton;
