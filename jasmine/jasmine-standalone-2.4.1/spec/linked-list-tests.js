describe('linked list implementation', function () {

	var linkedList;

	beforeEach(function () {
		linkedList = new LinkedList();
	});

	describe('insert', function () {

		it('should contain the element inserted', function () {
			linkedList.insert('BMW');
			expect(linkedList.contains('BMW')).toBeTruthy();
		});

		it('should return increase the size of the list', function () {
			linkedList.insert('Lexus');
			expect(linkedList.size()).toEqual(1);
		});
	});

	describe('remove', function () {

		beforeEach(function () {
			linkedList.insert('Toyota');
			linkedList.insert('Honda');
			linkedList.insert('Nissan');
		});

		it('should remove the correct element', function () {
			linkedList.remove('Nissan');

			expect(linkedList.contains('Toyota')).toBeTruthy();
			expect(linkedList.contains('Honda')).toBeTruthy();
			expect(linkedList.contains('Nissan')).toBeFalsy();
		});

		it('should remove only the first element encountered', function () {
			linkedList.insert('Toyota');
			linkedList.remove('Toyota');
			expect(linkedList.contains('Toyota')).toBeTruthy();
		});

		it('should decrease the size of the list', function () {
			linkedList.remove('Toyota');
			expect(linkedList.size()).toEqual(2);
		});
	});

	describe('contains', function () {

		beforeEach(function () {
			linkedList.insert('Ford');
			linkedList.insert('Chevy');
			linkedList.insert('Dodge');
		});

		it('should return true if the element when it is in list', function () {
			expect(linkedList.contains('Chevy')).toBeTruthy();
		});

		it('should return false when the element is not in list', function () {
			expect(linkedList.contains('GMC')).toBeFalsy();
		});
	});

	describe('size', function () {

		it('should return the correct size of the list', function () {
			linkedList.insert('Mazda');
			linkedList.insert('Hyundai');
			linkedList.insert('Mitsubishi');

			expect(linkedList.size()).toEqual(3);
		});
	});
});