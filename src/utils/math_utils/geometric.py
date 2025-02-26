import numpy as np


def rotate_vector(vector: np.ndarray, theta: float) -> np.ndarray:
    """2Dベクトルを θ ラジアン回転"""
    rotation_matrix = np.array(
        [[np.cos(theta), -np.sin(theta)], [np.sin(theta), np.cos(theta)]]
    )
    return rotation_matrix @ vector


def scale_vector(vector: np.ndarray, factor: float) -> np.ndarray:
    """ベクトルのスケール変更"""
    return vector * factor
