from functools import reduce
from typing import Callable, List


def apply_all(funcs: List[Callable[[float], float]], x: float) -> float:
    """複数の関数を順番に適用（関数合成）"""
    return reduce(lambda v, f: f(v), funcs, x)


def map_list(func: Callable[[float], float], lst: List[float]) -> List[float]:
    """関数をリストの各要素に適用"""
    return list(map(func, lst))


def filter_list(func: Callable[[float], bool], lst: List[float]) -> List[float]:
    """条件に合う要素をリストから抽出"""
    return list(filter(func, lst))


def reduce_list(func: Callable[[float, float], float], lst: List[float]) -> float:
    """リストの要素を累積計算"""
    return reduce(func, lst)
