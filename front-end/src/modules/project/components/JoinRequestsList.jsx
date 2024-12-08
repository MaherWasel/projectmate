import React from "react";
import Button from "../../../components/buttons/SubmitButton";
import avatar from "../../../assets/icons/ProfileIcon.svg";

const JoinRequestsList = ({ joinRequests, onAccept, onDecline }) => {
  return (
    <section className="mt-6 px-4 sm:px-10 py-6 sm:py-12">
      <h3 className="text-xl sm:text-3xl font-semibold mb-4">Join Requests</h3>
      {joinRequests.length === 0 ? (
        <p className="text-gray-400">No join requests at the moment.</p>
      ) : (
        <div className="space-y-4">
          {joinRequests.map((request) => (
            <div
              key={request._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-800 rounded-lg p-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={request.userId.image?.url || avatar}
                  alt={request.userId.username}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium">{request.userId.username}</h4>
                  <p className="text-gray-400 text-sm">
                    {request.userId.email}
                  </p>
                </div>
              </div>
              {request.message && (
                <p className="mt-4 text-gray-300 sm:mt-0 sm:ml-4 text-xl">
                  {request.message}
                </p>
              )}
              <div className="mt-2 sm:mt-0 sm:flex sm:space-x-2 sm:items-center">
                <Button
                  onClick={() => onAccept(request._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Accept
                </Button>
                <Button variant="error" onClick={() => onDecline(request._id)}>
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default JoinRequestsList;
