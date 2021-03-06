class Game {
  static start(element = document.querySelector('.game')) {
    new Game(element);
  }

  constructor(element) {
    this.element = element;
    this.table = this.element.querySelector('.game__field');
    this.size = this.table.rows.length;
    this.emptyCellClassName = 'game__field-cell--empty';

    const {
      cellIndex,
      parentElement: { rowIndex },
    } = this.table.querySelector(`.${this.emptyCellClassName}`);

    this.currentPosition = { x: cellIndex, y: rowIndex };

    this.table.addEventListener('mousedown', ({ target }) => {
      const cell = target.closest('.game__field-cell');
      if (!cell) {
        return;
      }
      this.handleMouseDown(cell);
    });

    window.addEventListener('keydown', ({ key }) => {
      this.handleKeyDown(key);
    });
  }

  handleMouseDown(cell) {
    const { x, y } = this.currentPosition;
    const { cellIndex, parentElement: { rowIndex } } = cell;
    const newPosition = { x: cellIndex, y: rowIndex };

    const isMoveable = Math.abs(x - cellIndex) + Math.abs(y - rowIndex) === 1;
    if (!isMoveable) {
      return;
    }

    this.changePosition(newPosition);
  }

  handleKeyDown(key) {
    const { x, y } = this.currentPosition;
    let newPosition;

    switch (key) {
      case 'ArrowUp':
        newPosition = { ...this.currentPosition, y: y + 1 };
        break;
      case 'ArrowDown':
        newPosition = { ...this.currentPosition, y: y - 1 };
        break;
      case 'ArrowLeft':
        newPosition = { ...this.currentPosition, x: x + 1 };
        break;
      case 'ArrowRight':
        newPosition = { ...this.currentPosition, x: x - 1 };
        break;
      default:
        return;
    }

    const row = this.table.rows[newPosition.y];
    if (row) {
      const cell = row.cells[newPosition.x];
      if (cell) {
        this.changePosition(newPosition);
      }
    }
  }

  changePosition(newPosition) {
    const { x, y } = this.currentPosition;
    const currentEmptyCell = this.table.rows[y].cells[x];
    const newEmptyCell = this.table.rows[newPosition.y].cells[newPosition.x];
    currentEmptyCell.textContent = newEmptyCell.textContent;
    currentEmptyCell.classList.remove(this.emptyCellClassName);
    newEmptyCell.classList.add(this.emptyCellClassName);
    newEmptyCell.textContent = '';
    this.currentPosition = newPosition;
  }
};

Game.start();
