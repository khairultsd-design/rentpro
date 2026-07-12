import { formatDistanceToNow } from "date-fns";

type Props = {
  date: Date;
};

export default function RelativeTime({
  date,
}: Props) {
  return (
    <span>
      {formatDistanceToNow(date, {
        addSuffix: true,
      })}
    </span>
  );
}