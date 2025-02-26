def add(x: float, y: float) -> float:
    """加算"""
    return x + y


def subtract(x: float, y: float) -> float:
    """減算"""
    return x - y


def multiply(x: float, y: float) -> float:
    """乗算"""
    return x * y


def divide(x: float, y: float) -> float:
    """除算（0除算を防ぐ）"""
    if y == 0:
        raise ValueError("0で割ることはできません")
    return x / y


def negate(x: float) -> float:
    """符号反転"""
    return -x
