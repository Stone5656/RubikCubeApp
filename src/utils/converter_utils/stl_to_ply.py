import open3d as o3d
from pathlib import Path

def load_stl(file_path: str) -> o3d.geometry.TriangleMesh:
    """
    STLファイルを読み込んで Open3D の TriangleMesh オブジェクトを返す（純粋関数）
    """
    mesh = o3d.io.read_triangle_mesh(file_path)
    return mesh

def convert_to_ply(mesh: o3d.geometry.TriangleMesh) -> o3d.geometry.TriangleMesh:
    """
    STLのメッシュをPLYフォーマットに変換（純粋関数）
    """
    # PLYフォーマット用のデータに変換（必要なら法線計算）
    if not mesh.has_vertex_normals():
        mesh.compute_vertex_normals()
    return mesh

def save_ply(mesh: o3d.geometry.TriangleMesh, output_path: str) -> None:
    """
    PLYファイルを指定したパスに保存（副作用のある関数）
    """
    o3d.io.write_triangle_mesh(output_path, mesh)

def stl_to_ply(input_stl: str, output_ply: str) -> None:
    """
    STLをPLYに変換し、ファイルに保存する（I/Oを含む処理をまとめた関数）
    """
    mesh = load_stl(input_stl)
    ply_mesh = convert_to_ply(mesh)
    save_ply(ply_mesh, output_ply)

if __name__ == "__main__":
    # テスト用: コマンドラインで実行できるようにする
    import argparse

    parser = argparse.ArgumentParser(description="Convert STL to PLY format.")
    parser.add_argument("input_stl", type=str, help="Input STL file path")
    parser.add_argument("output_ply", type=str, help="Output PLY file path")

    args = parser.parse_args()
    stl_to_ply(args.input_stl, args.output_ply)
