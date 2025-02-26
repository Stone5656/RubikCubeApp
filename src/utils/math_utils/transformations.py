from typing import Callable

def scale(factor: float) -> Callable[[float], float]:
    """スカラー値を掛ける関数を返す"""
    return lambda x: x * factor


def normalize(min_val: float, max_val: float) -> Callable[[float], float]:
    """値を0〜1に正規化"""

    def _normalize(x: float) -> float:
        return (x - min_val) / (max_val - min_val)

    return _normalize
