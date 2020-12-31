class Carousel {
  constructor(node, count, current = 0) {
    this.node = node;
    this.count = count;
    this.current = current;
    this.width = node.querySelector(".carousel__slide").offsetWidth;
    this.scrollWidth = node.scrollWidth;
    this.slidesContainer = node.querySelector(".carousel__slides");

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.scrollTo = this.scrollTo.bind(this);

    node
      .querySelector(".carousel__buttons__next")
      .addEventListener("click", this.next);
    node
      .querySelector(".carousel__buttons__previous")
      .addEventListener("click", this.previous);

    // extra
    const firstChild = this.slidesContainer.firstElementChild.cloneNode(true);
    const lastChild = this.slidesContainer.lastElementChild.cloneNode(true);
    this.slidesContainer.prepend(lastChild);
    this.slidesContainer.append(firstChild);
    this.slidesContainer.scrollTo(this.width, 0);
  }

  next() {
    console.log(this.current);
    if (this.current < this.count - 1) {
      this.current++;
      this.slidesContainer.scrollTo({
        left: (this.current + 1) * this.width,
        behavior: "smooth"
      });
    } else {
      this.slidesContainer.scrollTo(0, 0);
      this.current = -1;
      this.next();
    }
  }

  previous() {
    if (this.current > 0) {
      this.current--;
      this.slidesContainer.scrollTo({
        left: (this.current + 1) * this.width,
        behavior: "smooth"
      });
    } else {
      this.slidesContainer.scrollTo((this.count + 1) * this.width, 0);
      this.current = this.count;
      this.previous();
    }
  }

  scrollTo(number) {
    if (0 < number < this.count) {
      this.current = number;
      this.slidesContainer.scrollTo({
        left: (this.current + 1) * this.width,
        behavior: "smooth"
      });
    }
  }
}
var carousel1 = new Carousel(document.querySelector(".carousel"), 4);

document.querySelector("#x").addEventListener("click", () => {
  carousel1.scrollTo(2);
});
