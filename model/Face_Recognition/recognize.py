import cv2
import numpy as np
import insightface
from insightface.app import FaceAnalysis
from insightface.data import get_image as ins_get_image

# print("Hello World !")
# for file in os.listdir("results"):
#     fileName = os.fsdecode(file)
#     match = -1
#     matchDistance = 100
#     matchedImage = ""
#     print(fileName, "***********")
#     for image in os.listdir("Train Data"):
#         currImage = os.fsdecode(image)
#         print(currImage, "***")
#         matchResult = DeepFace.verify((f"results/{fileName}"),
#                                       (f"Train Data/{currImage}"),
#                                       model_name='ArcFace',
#                                       detector_backend='retinaface'
#                                       )

#         if matchResult['distance'] < matchDistance:
#             matchDistance = matchResult['distance']
#             matchedImage = currImage

#     print("%s matches with %s :: distanc = %s",
#           fileName, matchedImage, matchDistance)
