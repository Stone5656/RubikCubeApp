import open3d as o3d
import numpy as np
from typing import List, Tuple


def half(size: float) -> float:
    """
    サイズを2で割った値を返す。

    :param size: 元のサイズ。
    :return: 半分のサイズ。
    """
    return size / 2


def generate_point(x: float, y: float, z: float) -> np.ndarray:
    """
    3次元座標の点を生成する。

    :param x: x座標。
    :param y: y座標。
    :param z: z座標。
    :return: 点の座標を表す配列。
    """
    return np.array([x, y, z])


def generate_cube_points(size: float = 1.0) -> np.ndarray:
    """
    立方体の8つの頂点を生成する。
    中心が原点で、指定された辺の長さを持つ。

    :param size: 立方体の辺の長さ。
    :return: 頂点座標の配列。
    """
    h = half(size)
    points = np.array(
        [
            generate_point(-h, -h, -h),
            generate_point(h, -h, -h),
            generate_point(h, h, -h),
            generate_point(-h, h, -h),
            generate_point(-h, -h, h),
            generate_point(h, -h, h),
            generate_point(h, h, h),
            generate_point(-h, h, h),
        ]
    )
    return points


def create_point_cloud(points: np.ndarray) -> o3d.geometry.PointCloud:
    """
    頂点群からOpen3DのPointCloudオブジェクトを生成する。

    :param points: 頂点の座標配列。
    :return: PointCloudオブジェクト。
    """
    pcd = o3d.geometry.PointCloud()
    pcd.points = o3d.utility.Vector3dVector(points)
    return pcd


def create_line(p1: np.ndarray, p2: np.ndarray) -> List[List[int]]:
    """
    2つの点を結ぶ線を作成する。

    :param p1: 始点のインデックス。
    :param p2: 終点のインデックス。
    :return: 線を表すインデックスペアのリスト。
    """
    return [[p1, p2]]


def create_cube_lines() -> List[List[int]]:
    """
    立方体の各頂点を結ぶ線を生成する。
    :return: 立方体の線のインデックスリスト。
    """
    edges = [
        create_line(0, 1),
        create_line(1, 2),
        create_line(2, 3),
        create_line(3, 0),
        create_line(4, 5),
        create_line(5, 6),
        create_line(6, 7),
        create_line(7, 4),
        create_line(0, 4),
        create_line(1, 5),
        create_line(2, 6),
        create_line(3, 7),
    ]
    # ネストされたリストをフラットにする
    return [line for sublist in edges for line in sublist]


def display_cube(points: np.ndarray, lines: List[List[int]]) -> None:
    """
    Open3Dで立方体を線で表示する。

    :param points: 立方体の頂点。
    :param lines: 立方体の線。
    """
    line_set = o3d.geometry.LineSet()
    line_set.points = o3d.utility.Vector3dVector(points)
    line_set.lines = o3d.utility.Vector2iVector(lines)
    o3d.visualization.draw_geometries([line_set], window_name="Cube Lines")


# 立方体の点と線を生成して表示
cube_points = generate_cube_points()
cube_lines = create_cube_lines()
display_cube(cube_points, cube_lines)
