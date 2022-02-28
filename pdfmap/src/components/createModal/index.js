import { Modal, Form, Select, message } from 'antd';
import {
  SELECT_TYPE_OPTIONS,
  INITIAL_FORM_VALUES,
  handleSelectedType,
} from './constants';

export default function CreateModal({ visible, toggleVisible, addElement }) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const type = form.getFieldValue('type');
    const elementOptions = handleSelectedType(type);

    if (!elementOptions) message.error(`Invalid type: ${type}`);

    addElement(elementOptions);
  };

  return (
    <Modal
      title='Create Element'
      visible={visible}
      onOk={handleSubmit}
      onCancel={toggleVisible}
      okText='Create'
    >
      <Form form={form} initialValues={INITIAL_FORM_VALUES}>
        <Form.Item label='Type' name='type' required>
          <Select options={SELECT_TYPE_OPTIONS} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
}
