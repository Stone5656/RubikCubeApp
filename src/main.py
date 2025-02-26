from src.utils.converter_utils.stl_to_ply import stl_to_ply

input_path = "/workspace/public/models/tooth/tooth-data-T2-14.stl"
output_path = "/workspace/public/models/output/tooth-data-T2-14.ply"

stl_to_ply(input_path, output_path)
