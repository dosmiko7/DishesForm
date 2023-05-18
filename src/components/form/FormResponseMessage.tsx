import classes from "./Form.module.scss";

interface ResponseMessageProps {
	message: string;
}

const FormResponseMessage: React.FC<ResponseMessageProps> = ({ message }) => {
	return <div className={classes[`response-message`]}>{message}</div>;
};

export default FormResponseMessage;
