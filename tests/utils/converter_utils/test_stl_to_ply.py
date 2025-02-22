import pytest
import open3d as o3d
from src.utils.converter_utils.stl_to_ply import load_stl, convert_to_ply, save_ply
from unittest.mock import patch

@pytest.fixture
def test_mesh():
    """ テスト用のSTLデータを作成（pytest の fixture を使用）"""
    return o3d.geometry.TriangleMesh.create_sphere(radius=1.0)

def test_load_stl(test_mesh):
    """ STLファイルの読み込みが正常に行えるかテスト """
    with patch("open3d.io.read_triangle_mesh", return_value=test_mesh) as mock_read:
        mesh = load_stl("dummy.stl")
        assert isinstance(mesh, o3d.geometry.TriangleMesh)
        mock_read.assert_called_once_with("dummy.stl")

def test_convert_to_ply(test_mesh):
    """ PLYフォーマットへの変換が正常に行えるかテスト """
    ply_mesh = convert_to_ply(test_mesh)
    assert isinstance(ply_mesh, o3d.geometry.TriangleMesh)
    assert ply_mesh.has_vertex_normals()  # 法線データがあることを確認

def test_save_ply(test_mesh):
    """ PLYファイルの保存が正常に行えるかテスト（モック化） """
    with patch("open3d.io.write_triangle_mesh") as mock_write:
        save_ply(test_mesh, "output.ply")
        mock_write.assert_called_once_with("output.ply", test_mesh)
