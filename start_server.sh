docker run --rm --name sky_detector -p 8501:8501 -v /home/others/Workspace/TfServable/sky_detection:/models/sky_detection -e MODEL_NAME=sky_detection -td tensorflow/serving --model_config_file_poll_wait_seconds=60 --model_config_file=/models/sky_detection/models.config