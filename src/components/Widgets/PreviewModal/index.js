import { Modal } from 'antd';
import ProductView from '@/components/ProductView';
import './PreviewModal.css';
function PreviewModal(props) {
    const { product, open, close, oK } = props;
    return (
        <Modal
            key={'modal' + product._id}
            wrapClassName="product-item__modal"
            className="product-item__preview-modal"
            open={open}
            onOk={oK}
            onCancel={close}
            footer={[
                <button key="submit" type="button" hidden={true} onClick={oK}>
                    OK
                </button>,
                <button key="back" type="button" hidden={true} onClick={close}>
                    Cancel
                </button>,
            ]}
        >
            <ProductView product={product} key={"productview" + product._id}></ProductView>
        </Modal>
    );
}

export default PreviewModal;
