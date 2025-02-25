import open3d as o3d
import numpy as np


def mirror_points(pcd: o3d.geometry.PointCloud, axis: str) -> o3d.geometry.PointCloud:
    """指定した軸(x, y, z)を基準に点群を反転（副作用あり）"""

    points = np.asarray(pcd.points)

    if axis == "x":
        points[:, 0] *= -1
    elif axis == "y":
        points[:, 1] *= -1
    elif axis == "z":
        points[:, 2] *= -1
    else:
        raise ValueError("axis must be 'x', 'y', or 'z'")

    pcd.points = o3d.utility.Vector3dVector(points)
    return pcd


def translate_points(
    pcd: o3d.geometry.PointCloud, translation: tuple
) -> o3d.geometry.PointCloud:
    """点群を指定した(x, y, z)の方向に平行移動（副作用あり）"""

    pcd.points = o3d.utility.Vector3dVector(
        np.asarray(pcd.points) + np.array(translation)
    )
    return pcd


def rotate_points(
    pcd: o3d.geometry.PointCloud, rotation_matrix: np.ndarray
) -> o3d.geometry.PointCloud:
    """点群を指定した回転行列で回転（副作用あり）"""

    pcd.points = o3d.utility.Vector3dVector(np.asarray(pcd.points) @ rotation_matrix.T)
    return pcd


def merge_point_clouds(
    pcd1: o3d.geometry.PointCloud, pcd2: o3d.geometry.PointCloud
) -> o3d.geometry.PointCloud:
    """2つの点群を統合する（副作用なし）"""
    merged_pcd = o3d.geometry.PointCloud()
    merged_pcd.points = o3d.utility.Vector3dVector(
        np.vstack((np.asarray(pcd1.points), np.asarray(pcd2.points)))
    )
    return merged_pcd
