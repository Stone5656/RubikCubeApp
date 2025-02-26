import pytest
import open3d as o3d
import numpy as np
from src.utils.point_utils.advance_point_functions import (
    merge_point_clouds,
    mirror_points,
    rotate_points,
    translate_points
)
from src.utils.point_utils.base_point_functions import create_point_cloud


def test_mirror_points():
    points = np.array([[1, 2, 3], [-1, -2, -3], [4, 5, 6]])
    pcd = create_point_cloud(points)

    # x軸反転
    mirrored_x = mirror_points(pcd, "x")
    expected_x = np.array([[-1, 2, 3], [1, -2, -3], [-4, 5, 6]])
    np.testing.assert_allclose(np.asarray(mirrored_x.points), expected_x)

    # y軸反転
    mirrored_y = mirror_points(pcd, "y")
    expected_y = np.array([[-1, -2, 3], [1, 2, -3], [-4, -5, 6]])
    np.testing.assert_allclose(np.asarray(mirrored_y.points), expected_y)

    # z軸反転
    mirrored_z = mirror_points(pcd, "z")
    expected_z = np.array([[-1, -2, -3], [1, 2, 3], [-4, -5, -6]])
    np.testing.assert_allclose(np.asarray(mirrored_z.points), expected_z)

    # 無効な軸
    with pytest.raises(ValueError):
        mirror_points(pcd, "w")


def test_translate_points():
    points = np.array([[1, 2, 3], [4, 5, 6]])
    pcd = create_point_cloud(points)
    translated = translate_points(pcd, (1, -1, 2))
    expected = np.array([[2, 1, 5], [5, 4, 8]])
    np.testing.assert_allclose(np.asarray(translated.points), expected)


def test_rotate_points():
    points = np.array([[1, 0, 0], [0, 1, 0]])
    pcd = create_point_cloud(points)

    # 90度回転 (z軸)
    theta = np.pi / 2
    rotation_matrix = np.array(
        [
            [np.cos(theta), -np.sin(theta), 0],
            [np.sin(theta), np.cos(theta), 0],
            [0, 0, 1],
        ]
    )
    rotated = rotate_points(pcd, rotation_matrix)
    expected = np.array([[0, 1, 0], [-1, 0, 0]])
    np.testing.assert_allclose(np.asarray(rotated.points), expected, atol=1e-7)


def test_merge_point_clouds():
    points1 = np.array([[1, 2, 3], [4, 5, 6]])
    points2 = np.array([[7, 8, 9], [10, 11, 12]])
    pcd1 = create_point_cloud(points1)
    pcd2 = create_point_cloud(points2)
    merged = merge_point_clouds(pcd1, pcd2)
    expected = np.vstack((points1, points2))
    np.testing.assert_allclose(np.asarray(merged.points), expected)

    # 副作用がないことの確認
    assert np.array_equal(np.asarray(pcd1.points), points1)
    assert np.array_equal(np.asarray(pcd2.points), points2)
