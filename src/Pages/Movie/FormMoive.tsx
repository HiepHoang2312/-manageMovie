import { Button, Form, Input, Modal, Upload, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { MovieTable, Movie } from "Interface/movie";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getMovieShowing, updateFilm } from "Slices/movie";
import moment from "moment";
import { AppDispatch } from "configStore";
const { TextArea } = Input;

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Movie) => void;
  onCancel: () => void;
}

const FormMovie = ({ show, close, filmUpdate, type }: MovieTable) => {
  const dispatch = useDispatch<AppDispatch>();

  const validateMessages = {
    required: ` Không được để trống!`,
    // ...
  };
  const ImageFile = (e: UploadProps) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    useEffect(() => {
      if (type == "update") {
        form.setFieldsValue({
          maPhim: filmUpdate?.maPhim,
          tenPhim: filmUpdate?.tenPhim,
          biDanh: filmUpdate?.biDanh,
          trailer: filmUpdate?.trailer,
          ngayKhoiChieu: moment(`${filmUpdate?.ngayKhoiChieu}`, "YYYY-MM-DD"),
          danhGia: filmUpdate?.danhGia,
          moTa: filmUpdate?.moTa,
        });
      } else {
        form.setFieldsValue({
          maPhim: "",
          biDanh: "",
          tenPhim: "",
          trailer: "",
          ngayKhoiChieu: "",
          danhGia: "",
          moTa: "",
        });
      }
    }, [type, filmUpdate, show]);
    return (
      <Modal
        visible={visible}
        title="Nhập thông tin cần sửa"
        okText="Sửa"
        cancelText="Cancel"
        onCancel={close}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          validateMessages={validateMessages}
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{}}
        >
          <Form.Item
            name="maPhim"
            label="Mã Phim"
            rules={[
              {
                required: true,
              },
            ]}
            labelCol={{ span: 8 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tên Phim"
            name="tenPhim"
            rules={[{ required: true }]}
            labelCol={{ span: 0 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="hinhAnh"
            label="Hình Ảnh:"
            valuePropName="fileList"
            labelCol={{ span: 8 }}
            getValueFromEvent={ImageFile}
          >
            <Upload listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Bí Danh"
            name="biDanh"
            rules={[{ required: true }]}
            labelCol={{ span: 8 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ngayKhoiChieu"
            label="Ngày K/C"
            labelCol={{ span: 8 }}
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Đánh Giá"
            name="danhGia"
            rules={[{ required: true }]}
            labelCol={{ span: 8 }}
          >
            {/* <InputNumber min={1} max={10} defaultValue={3}  /> */}
            <Input />
          </Form.Item>
          <Form.Item
            label="Trailer"
            name="trailer"
            rules={[{ required: true }]}
            labelCol={{ span: 4 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô Tả"
            name="moTa"
            rules={[{ required: true }]}
            labelCol={{ span: 4 }}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    {
      setVisible(show);
    }
  });
  const onCreate = async (values: Movie) => {
    if (type == "update") {
      const data = {
        ...values,
        ngayKhoiChieu: moment(values["ngayKhoiChieu"]).format("DD/MM/YYYY"),
      };
      await dispatch(updateFilm(data));
    }
    close();
    dispatch(getMovieShowing());
  };

  return (
    <div>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default FormMovie;
