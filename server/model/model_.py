import cv2
import numpy as np
from insightface.app import FaceAnalysis
from insightface.data import get_image as ins_get_image
import os
import numpy as np
from numpy.linalg import norm
import matplotlib.pyplot as plt
import pickle

app = FaceAnalysis(name='buffalo_l',
                   providers=['CPUExecutionProvider'])
app.prepare(ctx_id=0, det_size=(640, 640))

data = pickle.load(open(r'server\model\embeddings.pkl', 'rb'))

a = data[0]
b = data[1]

present = set()

for images in os.listdir(r'server\model\Test_Images'):
    fileName = os.fsdecode(images)
    img = cv2.imread(r'server\model\Test_Images\\' + fileName)
    faces = app.get(img)
    for face in faces:

        embeddings = face['embedding']
        match = -1
        matchDistance = -100
        matchedImage = ""

        for i in range(len(a)):

            cosine = np.dot(embeddings, b[i])/(norm(embeddings)*norm(b[i]))

            if cosine > matchDistance:
                matchDistance = cosine
                matchedImage = a[i]
        print(matchedImage, matchDistance)
        present.add(matchedImage)

        cv2.rectangle(img, (int(face['bbox'][0]), int(face['bbox'][1])), (int(
            face['bbox'][2]), int(face['bbox'][3])), (0, 255, 0), 1)
        img = cv2.putText(img, matchedImage, (int(face['bbox'][0]), int(face['bbox'][1])),
                          cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0, 255, 255), 2)

        cv2.imwrite(r'server\model\results' + fileName, img)
