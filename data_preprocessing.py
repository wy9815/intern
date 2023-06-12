import numpy as np
import cv2

#使用one-hot将类别转化为编码
def one_hot_encode(category, num_classes):
    encoded = np.zeros(num_classes)
    encoded[category] = 1
    return encoded

#使用双线性插值进行图像缩放
def load_and_resize_image(image_path, target_size):
    image = cv2.imread(image_path)
    image = cv2.resize(image, target_size, interpolation=cv2.INTER_LINEAR)
    return image

#标准化/归一化
def normalize_image(image):
    mean = np.mean(image)
    std = np.std(image)
    normalized_image = (image - mean) / std
    return normalized_image



if __name__ == '__main__':

    image_path = 'datasets/coco128/images/train2017/000000000009.jpg'
    target_size = (224, 224)
    num_classes = 10

    # 1. 类别数转为编码
    category = 3
    encoded_category = one_hot_encode(category, num_classes)

    # 2. 加载图片并缩放resize
    image = load_and_resize_image(image_path, target_size)

    # 3. 减均值除方差（标准化/归一化）
    normalized_image = normalize_image(image)

    cv2.imshow('Preprocessed Image', normalized_image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    cv2.imwrite('preprocessed_data/image_01.jpg', normalized_image)
