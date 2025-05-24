import { debounce } from "@/lib/debounce"

jest.useFakeTimers()

describe("debounce utility", () => {
  let mockFn: jest.Mock

  beforeEach(() => {
    mockFn = jest.fn()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  it("calls the function after the wait time (trailing edge)", () => {
    const debounced = debounce(mockFn, 200)
    debounced()
    expect(mockFn).not.toBeCalled()

    jest.advanceTimersByTime(199)
    expect(mockFn).not.toBeCalled()

    jest.advanceTimersByTime(1)
    expect(mockFn).toBeCalledTimes(1)
  })

  it("does not call the function more than once if called rapidly", () => {
    const debounced = debounce(mockFn, 300)
    debounced()
    debounced()
    debounced()

    jest.advanceTimersByTime(300)
    expect(mockFn).toBeCalledTimes(1)
  })

  it("calls the function immediately if 'immediate' is true", () => {
    const debounced = debounce(mockFn, 200, true)
    debounced()
    expect(mockFn).toBeCalledTimes(1)

    // It shouldn't call again after the timer if no more calls
    jest.advanceTimersByTime(200)
    expect(mockFn).toBeCalledTimes(1)
  })

  it("calls the function again only after the wait period ends when 'immediate' is true", () => {
    const debounced = debounce(mockFn, 300, true)
    debounced() // should call immediately
    debounced() // should be ignored
    debounced() // should be ignored

    expect(mockFn).toBeCalledTimes(1)

    jest.advanceTimersByTime(300)

    debounced() // now it should call again
    expect(mockFn).toBeCalledTimes(2)
  })

  it("maintains correct 'this' context", () => {
    const context = {
      value: 42,
      handler(this: any) {
        mockFn(this.value)
      },
    }

    const debounced = debounce(context.handler, 100)
    debounced.call(context)

    jest.advanceTimersByTime(100)
    expect(mockFn).toBeCalledWith(42)
  })
})
