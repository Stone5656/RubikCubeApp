import statistics
from typing import List


def mean(lst: List[float]) -> float:
    """平均"""
    return statistics.mean(lst)


def variance(lst: List[float]) -> float:
    """分散"""
    return statistics.variance(lst)


def median(lst: List[float]) -> float:
    """中央値"""
    return statistics.median(lst)
