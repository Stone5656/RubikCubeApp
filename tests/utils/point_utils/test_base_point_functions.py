import pytest
import open3d as o3d
import numpy as np
from src.utils.point_utils.base_point_functions import (
    create_point,
    create_point_cloud,
    random_point,
    random_points,
    scale_point,
    set_point_color,
)


@pytest.fixture
def sample_point():
    """テストごとに新しい1点の PointCloud を提供"""
    return create_point(1.0, 2.0, 3.0)


@pytest.fixture
def sample_random_point():
    """テストごとにランダムな1点の PointCloud を提供"""
    return random_point()


@pytest.fixture
def sample_random_points():
    """テストごとにランダムな複数点の PointCloud を提供"""
    np.random.seed(42)  # 乱数を固定して再現性を確保
    return random_points(5)


def test_create_point(sample_point):
    # 1. 返り値の型チェック
    assert isinstance(sample_point, o3d.geometry.PointCloud)

    # 2. 点の座標が正しいかチェック
    points = np.asarray(sample_point.points)  # Open3DのVector3dVectorをnumpy配列に変換
    assert points.shape == (1, 3)  # 1点だけ含まれているか
    assert np.allclose(points, [[1.0, 2.0, 3.0]])  # 値が正しいか


def test_set_point_color(sample_point):
    color = (0.5, 0.5, 0.5)

    set_point_color(
        sample_point, color
    )  # 副作用ありのため fixture のオブジェクトが変更される

    # 1. 返り値の型チェック
    assert isinstance(sample_point, o3d.geometry.PointCloud)

    # 2. 色が正しく設定されているか
    colors = np.asarray(sample_point.colors)
    assert colors.shape == (1, 3)  # 1点だけ含まれているか
    assert np.allclose(colors, [[0.5, 0.5, 0.5]])  # 設定した色と一致するか


def test_random_point(sample_random_point):
    # 1. 返り値の型チェック
    assert isinstance(sample_random_point, o3d.geometry.PointCloud)

    # 2. 点の座標が (0,1) の範囲にあるか
    points = np.asarray(sample_random_point.points)
    assert points.shape == (1, 3)  # 1点だけ含まれているか
    assert np.all(points >= 0.0) and np.all(points <= 1.0)  # すべての座標が 0<=x<=1


def test_random_points(sample_random_points):
    # 1. 返り値の型チェック
    assert isinstance(sample_random_points, o3d.geometry.PointCloud)

    # 2. 点の数が 5 個あるか
    points = np.asarray(sample_random_points.points)
    assert points.shape == (5, 3)  # 5点だけ含まれているか

    # 3. すべての点の座標が (0,1) の範囲にあるか
    assert np.all(points >= 0.0) and np.all(points <= 1.0)


def test_scale_point():
    scale = 2.0
    pcd = create_point_cloud(
        [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0], [7.0, 8.0, 9.0]]
    )  # 毎回新しい点群を作成
    old_points1 = np.asarray(pcd.points, dtype=np.float64)

    print("\n=== [BEFORE SCALING] ===")
    print("Original Points:\n", old_points1)

    scale_point(pcd, scale)

    new_points = np.asarray(pcd.points, dtype=np.float64)

    print("\n=== [AFTER SCALING] ===")
    print("Scaled Points:\n", new_points)

    # 1. 形状が変わらないことを確認
    assert new_points.shape == old_points1.shape

    # 2. 各点が正しくスケールされていることを確認
    pcd = create_point_cloud(
        [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0], [7.0, 8.0, 9.0]]
    )  # 毎回新しい点群を作成
    old_points2 = np.asarray(pcd.points, dtype=np.float64)

    expected_scaled_points = old_points2 * scale
    print("\n=== [EXPECTED SCALED POINTS] ===")
    print(expected_scaled_points)

    diff = new_points - expected_scaled_points
    print("\n=== [DIFFERENCE] ===")
    print(diff)

    assert np.allclose(
        new_points, expected_scaled_points, atol=1e-6
    ), f"Scaling mismatch:\nExpected:\n{expected_scaled_points}\nGot:\n{new_points}\nDifference:\n{diff}"


def test_create_point_cloud():
    points = [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0], [7.0, 8.0, 9.0]]
    pcd = create_point_cloud(points)

    # 1. 返り値の型チェック
    assert isinstance(pcd, o3d.geometry.PointCloud)

    # 2. 点の座標が正しく格納されているかチェック
    result_points = np.asarray(pcd.points)
    assert result_points.shape == (3, 3)  # 3点あることを確認
    assert np.allclose(result_points, np.array(points))  # 元の座標と一致しているか
