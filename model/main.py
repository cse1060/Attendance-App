import cv2
import numpy as np
import insightface
from insightface.app import FaceAnalysis
from insightface.data import get_image as ins_get_image
import os
import numpy as np
from numpy.linalg import norm
import matplotlib.pyplot as plt

app=FaceAnalysis(name='buffalo_l',
                     providers=['CPUExecutionProvider'])
app.prepare(ctx_id=0,det_size=(640,640))

a = []
b = []
for file in os.listdir("train_data"):
  filename = os.fsdecode(file)
  if filename == '.ipynb_checkpoints':
    continue
  a.append(filename)
  img=cv2.imread("train_data/" + filename)
  faces = app.get(img , max_num =1)
  b.append(faces[0]['embedding'])

print(a)

present= set()

for images in os.listdir("Test_Images"):
  fileName = os.fsdecode(images)
  img=cv2.imread("Test_Images/" + fileName)
  faces = app.get(img)
  for face in faces :
    # print(faces[0]['embedding'])
  # for file in os.listdir("/content/results"):
  #     fileName = os.fsdecode(file)
    embeddings = face['embedding']
    match = -1
    matchDistance = -100
    matchedImage = ""
  #     print(fileName, "***********")
  #     img=cv2.imread("/content/results/" + fileName)
  #     faces = app.get(img , max_num =1)
  #     # print(faces)
  #     if(len(faces)== 0):
  #       continue
  #     embeddings = faces[0]['embedding']
    for i in range(len(a)):
        # currImage = os.fsdecode(image)
        # print(currImage, "***")
        cosine = np.dot(embeddings, b[i])/(norm(embeddings)*norm(b[i]))
        # matchResult = DeepFace.verify((f"results/{fileName}"),
        #                               (f"Train Data/{currImage}"),
        #                               model_name='ArcFace',
        #                               detector_backend='retinaface'
        #                               )
        # print(i)
        if cosine > matchDistance:
            matchDistance = cosine
            matchedImage = a[i]
    print(matchedImage, matchDistance)
    present.add(matchedImage)
    # print(face['bbox'][0] , face['bbox'][1] , face['bbox'][2] ,face['bbox'][3])
    cv2.rectangle(img , (int(face['bbox'][0]) , int(face['bbox'][1]) ) , (int(face['bbox'][2]) , int(face['bbox'][3]) ) , (0 , 255 , 0) , 1)
    img = cv2.putText(img, matchedImage, (int(face['bbox'][0]) , int(face['bbox'][1])),
                      cv2.FONT_HERSHEY_SIMPLEX, 0.4, (0,255,255), 2)
    
    cv2.imwrite("results/" + fileName , img)