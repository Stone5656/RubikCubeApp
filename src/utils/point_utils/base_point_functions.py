import open3d as o3d
import numpy as np


def create_point(x: float, y: float, z: float) -> o3d.geometry.PointCloud:
    """指定した座標に点を作成"""
    pcd = o3d.geometry.PointCloud()
    pcd.points = o3d.utility.Vector3dVector(np.array([[x, y, z]]))
    return pcd


def set_point_color(
    pcd: o3d.geometry.PointCloud, color: tuple
) -> o3d.geometry.PointCloud:
    """点に色を付ける（副作用あり）"""
    colors = np.tile(np.array(color), (len(pcd.points), 1))  # 全点に同じ色を適用
    pcd.colors = o3d.utility.Vector3dVector(colors)
    return pcd


def random_point() -> o3d.geometry.PointCloud:
    """ランダムな点を1つ作成"""
    return create_point(*np.random.rand(3))


def random_points(n: int) -> o3d.geometry.PointCloud:
    """指定した数のランダムな点群を作成"""
    pcd = o3d.geometry.PointCloud()
    pcd.points = o3d.utility.Vector3dVector(np.random.rand(n, 3))
    return pcd


def scale_point(pcd: o3d.geometry.PointCloud, scale: float) -> o3d.geometry.PointCloud:
    """指定したスケールで点を拡大縮小（副作用あり）"""
    scaled_points = np.array(pcd.points, dtype=np.float64) * np.float64(
        scale
    )  # 明示的に float64 に変換
    pcd.points = o3d.utility.Vector3dVector(scaled_points)  # Vector3dVector に変換
    return pcd


def create_point_cloud(points: list) -> o3d.geometry.PointCloud:
    """複数の点を受け取って点群として返す"""
    pcd = o3d.geometry.PointCloud()
    pcd.points = o3d.utility.Vector3dVector(np.array(points))
    return pcd
