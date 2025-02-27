import open3d as o3d
import numpy as np


def add_noise_to_pcd(pcd, noise_std=0.01):
    """既存の点群にガウスノイズを追加"""
    points = np.asarray(pcd.points)
    noise = np.random.normal(scale=noise_std, size=points.shape)  # ガウスノイズ
    noisy_points = points + noise  # ノイズを加える

    noisy_pcd = o3d.geometry.PointCloud()
    noisy_pcd.points = o3d.utility.Vector3dVector(noisy_points)

    # 色がある場合はコピー
    if pcd.has_colors():
        noisy_pcd.colors = pcd.colors
    if pcd.has_normals():
        noisy_pcd.normals = pcd.normals

    return noisy_pcd


# PLYファイルの読み込み
pcd = o3d.io.read_point_cloud("/workspace/public/models/output/tooth-data-T2-14.ply")

# ノイズを追加
noisy_pcd = add_noise_to_pcd(pcd, noise_std=0.02)

# 表示
o3d.visualization.draw_geometries([noisy_pcd])

# 保存
o3d.io.write_point_cloud(
    "/workspace/public/models/output/tooth-noise.ply", noisy_pcd
)
