import './styles.scss';

function Paragraph({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`paragraph ${className}`} {...props} />;
}

export default Paragraph;
