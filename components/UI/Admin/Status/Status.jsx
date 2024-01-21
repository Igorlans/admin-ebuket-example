import classes from "./status.module.scss"

const Status = ({ variant }) => {
    let colorClass;
    let text;
  
    switch (variant) {
      case "ON_MODERATION":
        colorClass = "moderation";
        text = "На модерації";
        break;
      case "REJECTED":
        colorClass = "rejected";
        text = "Відхилено";
        break;
      case "ALLOWED":
        colorClass = "allowed";
        text = "Допущено";
        break;
      default:
        colorClass = "default";
        text = variant;
        break;
    }
  
    return <div className={classes[`status-${colorClass}`]}>{text}</div>;
};
  
export default Status;
