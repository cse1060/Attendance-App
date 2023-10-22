import cv2
import os
import matplotlib.pyplot as plt
from retinaface import RetinaFace

image_path = "test_img2.jpg"
img = cv2.imread(image_path)
image = cv2.imread(image_path)
resp = RetinaFace.detect_faces(image_path)

path = "results"
i = 1

for coor in resp.values():
    cv2.rectangle(img, (coor['facial_area'][0] - 10, coor['facial_area'][1] - 10),
                  (coor['facial_area'][2] + 10, coor['facial_area'][3] + 10), (0, 255, 0), 1)
    box_image = image[coor['facial_area'][1] - 10: coor['facial_area']
                      [3]+10, coor['facial_area'][0] - 10: coor['facial_area'][2] + 10]
    box_image = cv2.resize(box_image, (300, 300))
    cv2.imwrite(os.path.join(path, str(i) + ".jpg"), box_image)
    i += 1
plt.figure(figsize=(20, 10))
plt.imshow(img)
plt.axis('off')
plt.show()
