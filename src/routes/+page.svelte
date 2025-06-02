<script lang="ts">
	import Content from "$lib/components/Content.svelte";
	import Code from "$lib/components/Code.svelte";
</script>

<Content title="Implementing your own eviction policy">
	<p>PaperCache makes it easy to implement your own eviction policies. Here, we describe how to add a custom eviction policy to PaperCache by implementing the <b>LRU</b> eviction policy.</p>

	<ol>
		<li><p>Add our new policy, <b>Lru</b>, as an enum entry in <b>paper-cache/src/policy.rs</b>, following existing examples.</p></li>
		<li><p>Add file <b>lru_stack.rs</b> to <b>paper-cache/src/worker/policy/policy_stack</b>.</p></li>

		<li>
			<p>Create a struct to hold the state of the custom eviction policy. In this case, we will hold all the keys in LRU order in a HashList (i.e., doubly-linked list + hash table for <i>O(1)</i> operations) from the <b>kwik</b> library:</p>
			<Code lang="rust" numbers code={`
				use kwik::collections::HashList;
				use crate::{HashedKey, NoHasher};

				#[derive(Default)]
				pub struct LruStack {
					stack: HashList<HashedKey, NoHasher>,
				}
			`} />
			<p>We disable hashing in the HashList as the keys are pre-hashed by the cache.</p>
		</li>

		<li>
			<p>Implement the <b>PolicyStack</b> trait for our new struct:</p>
			<Code lang="rust" numbers code={`
				use crate::{
					policy::PaperPolicy,
					object::ObjectSize,
					worker::policy::policy_stack::PolicyStack,
				};

				impl PolicyStack for LruStack {
					/// A utility function used internally by PaperCache.
					fn is_policy(&self, policy: PaperPolicy) -> bool {
						matches!(policy, PaperPolicy::Lru)
					}

					/// Returns the number of keys in the stack.
					fn len(&self) -> usize {
						self.stack.len()
					}

					/// Checks if the supplied key exists in the stack.
					fn contains(&self, key: HashedKey) -> bool {
						self.stack.contains(&key)
					}

					/// Inserts a new key into the stack. Be sure to not have duplicate keys
					/// and do not perform any evictions here. In the case of LRU, we do not
					/// need to use the object size, though in other policies it may be required.
					fn insert(&mut self, key: HashedKey, _: ObjectSize) {
						if self.stack.contains(&key) {
							return self.update(key);
						}

						self.stack.push_front(key);
					}

					/// Updates an existing key in the stack. In this case, move the key
					/// to the front of the stack.
					fn update(&mut self, key: HashedKey) {
						self.stack.move_front(&key);
					}

					/// Remove the supplied key from the stack.
					fn remove(&mut self, key: HashedKey) {
						self.stack.remove(&key);
					}

					/// Clear the stack.
					fn clear(&mut self) {
						self.stack.clear();
					}

					/// Perform one eviction from the stack.
					fn pop(&mut self) -> Option<HashedKey> {
						self.stack.pop_back();
					}
				}
			`} />
			<p>Although not strictly necessary, adding tests to ensure your stack is working correctly is a good idea here (you can find how to do this in existing examples).</p>
		</li>

		<li>
			<p>Add our new policy to the <b>init_policy_stack</b> function in <b>paper-cache/src/worker/policy/policy_stack/mod.rs</b>, following existing examples.</p>
		</li>
	</ol>

	<p>Our new policy is now implemented in PaperCache!</p>
</Content>

<style lang="scss">
	ol {
		padding-left: 16px;

		li {
			color: #222222;
			font-size: 16px;
			line-height: 20px;
			margin: 12px 0;
		}
	}
</style>
