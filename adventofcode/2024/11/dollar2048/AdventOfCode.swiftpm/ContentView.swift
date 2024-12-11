import SwiftUI

struct ContentView: View {
    let input = [814, 1183689, 0, 1, 766231, 4091, 93836, 46]

    var body: some View {
        List {
            Text(input.description)
            Text("Initial -> \(input.count) stones")

            var counter = 0
            var output = input
            let result = blink(stones: &output, counter: &counter)
            Text("After \(counter) blink -> \(result.count) stones")
                .onAppear {
                    print(result.count)
                }
        }
    }

    func blink(stones: inout [Int], counter: inout Int) -> [Int] {
        if counter == 25 {
            return stones
        }

        var newStones: [Int] = []

        stones.forEach {
            if $0 == 0 {
                newStones.append(1)
            } else {
                let length = String($0).count

                if length.isMultiple(of: 2) {
                    let power = (pow(10, length / 2) as NSDecimalNumber).intValue
                    newStones.append($0 / power)
                    newStones.append($0 % power)
                } else {
                    newStones.append($0 * 2024)
                }
            }
        }

        counter += 1
        return blink(stones: &newStones, counter: &counter)
    }
}
