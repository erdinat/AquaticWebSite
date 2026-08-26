import { Form, Input } from 'antd';

/** Hidden field used to silently reject bot submissions — real users never see or fill it. */
const HoneypotField = () => (
    <Form.Item name="website" style={{ display: 'none' }} aria-hidden="true">
        <Input tabIndex={-1} autoComplete="off" />
    </Form.Item>
);

export default HoneypotField;
